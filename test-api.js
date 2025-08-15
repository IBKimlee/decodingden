// Quick test of the generate-lesson API endpoint
const testPhoneme = "/sh/";

fetch('http://localhost:3000/api/generate-lesson', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ phoneme: testPhoneme })
})
.then(response => response.json())
.then(data => {
  console.log('✅ API Response:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('❌ API Error:', error);
});