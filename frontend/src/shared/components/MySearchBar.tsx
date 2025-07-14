import { Search } from 'lucide-react';
import { Input } from './ui/input';

export const MySearchBar = () => {
  return (
    <form className="flex items-center w-full font-[poppins]">
      <Input
        type="text"
        className="rounded-r-none "
        placeholder="Search for products, categories and more"
      />
      <button className="rounded-md ring-1 ring-slate-100 py-2 px-3  bg-primary rounded-l-none">
        <Search strokeWidth={2} color="white" />
      </button>
    </form>
  );
};
