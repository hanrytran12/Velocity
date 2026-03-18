using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.AddReview;

public class AddReviewCommandHandler : IRequestHandler<AddReviewCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public AddReviewCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        if (request.Rating < 1 || request.Rating > 5)
            return Result.Failure("Rating must be between 1 and 5.");

        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.Query()
            .Include(o => o.Items)
            .ThenInclude(i => i.ProductVariant)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);

        if (order == null)
            return Result.Failure("Order not found.");

        if (order.CustomerId != request.CustomerId)
            return Result.Failure("Unauthorized access to this order.");

        if (order.Status != OrderStatus.Completed)
            return Result.Failure("You can only review products from completed orders.");

        var hasProduct = order.Items.Any(i => i.ProductVariant != null && i.ProductVariant.ProductId == request.ProductId);
        if (!hasProduct)
            return Result.Failure("You did not purchase this product in this order.");

        var reviewRepo = _unitOfWork.Repository<Review>();
        var existingReview = await reviewRepo.Query()
            .AnyAsync(r => r.OrderId == request.OrderId && r.ProductId == request.ProductId, cancellationToken);

        if (existingReview)
            return Result.Failure("You have already reviewed this product for this order.");

        var review = new Review
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            ProductId = request.ProductId,
            OrderId = request.OrderId,
            Rating = request.Rating,
            Comment = request.Comment,
            CreatedAt = DateTime.UtcNow
        };

        await reviewRepo.AddAsync(review);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Recalculate Average Rating
        var productRepo = _unitOfWork.Repository<Product>();
        var product = await productRepo.GetByIdAsync(request.ProductId);
        
        if (product != null)
        {
            var average = await reviewRepo.Query()
                .Where(r => r.ProductId == request.ProductId)
                .AverageAsync(r => (double?)r.Rating, cancellationToken) ?? 0;
                
            product.AverageRating = Math.Round(average, 1);
            productRepo.Update(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }
}
