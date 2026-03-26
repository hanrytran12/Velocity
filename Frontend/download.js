const fs = require('fs');
const https = require('https');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzlhZDhhNWE1MjYyYjRjM2Q5YjAyZTc4MzYzMzc4ZjJkEgsSBxDB9YWAvwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NDA1MjE0MDU0MjIzNDQyODQ5&filename=&opi=89354086";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('stitch_checkout.html', data);
    console.log('Downloaded successfully');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
