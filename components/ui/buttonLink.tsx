type ButtonLinkProps = {
    href: string;
    mobileCopy: string;
    desktopCopy: string;
}

const ButtonLink = ({ href, mobileCopy, desktopCopy }: ButtonLinkProps) => {
    return (
      <>
      {/* Button visible on small screens */}
        <a
          href={href}
          className="w-full inline-block px-12 py-4 text-md text-center text-white bg-primary hover:bg-primary/90 rounded-md transition duration-150 ease-in-out md:hidden"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          {mobileCopy}
        </a>

      {/* Button visible on medium screens and above */}
        <a
          href={href}
          className="w-full text-center hidden md:inline-block mx-2 py-4 text-lg text-white bg-primary hover:bg-primary/90 rounded-md transition duration-300 ease-in-out"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          {desktopCopy}
        </a>
      </>
    );
  };
  
  export default ButtonLink;