import messenger from "../../assets/images/messenger.png";
const Blank = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <img className="w-24 h-24 mx-auto" src={messenger} alt="" />
        <h1 className="text-xl font-semibold mt-4">No chats selected</h1>
      </div>
    </div>
  );
};

export default Blank;
