using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Infrastructure.BackgroundJobs;

public class OrderCompletionBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OrderCompletionBackgroundService> _logger;

    public OrderCompletionBackgroundService(
        IServiceProvider serviceProvider,
        ILogger<OrderCompletionBackgroundService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("OrderCompletionBackgroundService is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessCompletedOrdersAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred executing OrderCompletionBackgroundService.");
            }

            // Wait for 1 hour before running again
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }

    private async Task ProcessCompletedOrdersAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
        var orderRepo = unitOfWork.Repository<Order>();

        var cutoffDate = DateTime.UtcNow.AddDays(-7);

        var ordersToComplete = await orderRepo.Query()
            .Where(o => o.Status == OrderStatus.Delivered && o.DeliveredAt.HasValue && o.DeliveredAt.Value <= cutoffDate)
            .ToListAsync(cancellationToken);

        if (ordersToComplete.Any())
        {
            foreach (var order in ordersToComplete)
            {
                order.Status = OrderStatus.Completed;
                order.CompletedAt = DateTime.UtcNow;
                orderRepo.Update(order);
                _logger.LogInformation($"Auto-completed Order ID: {order.Id}");
            }

            await unitOfWork.SaveChangesAsync(cancellationToken);
            _logger.LogInformation($"Successfully auto-completed {ordersToComplete.Count} orders.");
        }
    }
}
