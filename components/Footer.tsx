import Image from "next/image";

const Footer = () => {
  return (
    <footer className="header_footer_component p-2">
      <Image src="\github.svg" height={30} width={30} alt="Github logo"></Image>
    </footer>
  );
};

export default Footer;
