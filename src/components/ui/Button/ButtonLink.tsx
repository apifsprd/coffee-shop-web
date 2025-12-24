import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  title: string;
}

const ButtonLink = ({ href, title }: ButtonLinkProps) => (
  <Link
    href={href}
    // Tambahkan class 'group' untuk mengontrol elemen di dalamnya saat di-hover
    className="relative inline-block font-semibold group"
  >
    {title}

    {/* Elemen Garis Bawah (Underline) */}
    <span
      className="
      absolute 
      bottom-0 
      left-0 
      h-0.5             
      w-0                 
      bg-current          
      transition-all      
      duration-300        
      ease-out
      group-hover:w-full  
    "
    />
  </Link>
);

export default ButtonLink;
