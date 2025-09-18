import Form from "next/form";
import {Search} from 'lucide-react';
import SearchFormReset from './SearchFormReset';

const SearchForm = ({query} : {query?:string}) => {
  return (
    <Form className="search-form" action="/" scroll={false}>
        <input
          // type="search"
          name="query"
          defaultValue={query}
          placeholder="Search for startups..."
          className="search-input"
        ></input>
        <div className='flex gap-2'>
            {query && (<SearchFormReset />)}
            <button type="submit" className="search-btn text-white">
                <Search className='size-5'/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm