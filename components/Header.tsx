import Image from "next/image";

const Header = () => {
  return (
    <header className="header_footer_component flex justify-center items-center p-2">
      <Image src="/logo.svg" alt="App logo" width={40} height={40} />
      <h3 className="text-white text-2xl font-bold">AgileVote</h3>
    </header>
  );
};

export default Header;
