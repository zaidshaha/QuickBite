export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>🍴 QuickBite</h3>
        <p>Your campus cravings, sorted.</p>
      </div>

      <p>© {new Date().getFullYear()} QuickBite. Demo website.</p>
    </footer>
  );
}