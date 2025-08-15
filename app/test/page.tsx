export default function TestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Test Page</h1>
      <p>If you can see this, Next.js is working!</p>
      <div className="bg-blue-500 text-white p-4 rounded">
        This should have a blue background if Tailwind is working
      </div>
    </div>
  );
}