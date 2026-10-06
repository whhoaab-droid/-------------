import fs from 'fs';
import https from 'https';

const files = [
  {
    name: 'index.html',
    title: 'الرئيسية - صالون مسار العمل الحر الفاخر',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ZDAxYzRiYzkzYzAwMjNiYzBjN2EwMDUwMmVmEgsSBxDI5erKhwkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzg3NjM5MDAxMTM0NTEwODEzOA&filename=&opi=89354086'
  },
  {
    name: 'expert-profile.html',
    title: 'الملف التعريفي للخبيرة سارة الشمري - صالون مسار العمل الحر',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ZDAyMjEwOGRkZWIwM2IxODY5ODY4MWEzY2UxEgsSBxDI5erKhwkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzg3NjM5MDAxMTM0NTEwODEzOA&filename=&opi=89354086'
  },
  {
    name: 'booking.html',
    title: 'حجز موعد هجين (صالون / منزلي) - مسار العمل الحر',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ZDAxYzNkODE3ZDIwNDVhZGU4M2JmMThkNTM4EgsSBxDI5erKhwkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzg3NjM5MDAxMTM0NTEwODEzOA&filename=&opi=89354086'
  },
  {
    name: 'client-dashboard.html',
    title: 'لوحة تحكم العميلة وحجوزاتي - صالون مسار العمل الحر',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ZDAxYzI3MDMyMzUwMjNiZWYxZGQyMDQ1MDIxEgsSBxDI5erKhwkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzg3NjM5MDAxMTM0NTEwODEzOA&filename=&opi=89354086'
  },
  {
    name: 'admin-dashboard.html',
    title: 'لوحة إدارة الصالون والمواعيد - مسار العمل الحر',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1ZDAxYzU2NGFiY2EwMjNiZWYxZGQyMDQ1MDIxEgsSBxDI5erKhwkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzg3NjM5MDAxMTM0NTEwODEzOA&filename=&opi=89354086'
  },
  {
    name: 'avatar.png',
    title: 'Client Avatar',
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1WEPaC8plUmHdh-fUgUZAGSVeqMswmG8y39KSf2O3nuKi2MqpkfQlsLmzva3nuX9C1cV3AMQ4eTP8lXgzoTnyiTFi56gVAMFw44ojR4BAANv-nXuyN4YLxH8RxAsicbgzE904AS4aHE6DgosqSm7yMR7LrFqbLkqLQumwgffI-ugqNBD8lAxGr-iw-6D_RVF94lPl4UtpzgxJi5DQF74Wpd8I8NMxyHPYcdDFQEVhrI7-oktutZX4nt3sat'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Saved: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  for (const item of files) {
    try {
      console.log(`Downloading ${item.name} (${item.title})...`);
      await download(item.url, item.name);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

main();
