export default function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center border-t">
      <span className="text-sm text-gray-800">&copy; {new Date().getFullYear()} HueCraft. All rights reserved.</span>
    </footer>
  );
}