import { Search } from "lucide-react";

export const SearchForm = () => {
  return (
    <form className="flex items-center">
      <input
        type="text"
        className="outline-0 border-2 border-border rounded-md p-2 w-full hover:border-black focus:border-primary md:rounded-r-none"
      />
      <button type="submit" className="hidden md:block p-2 bg-primary text-white border-2 border-primary rounded-r-md"><Search/></button>
    </form>
  );
};
