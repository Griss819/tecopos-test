'use client'

import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useState} from "react";

export default function ProductSearch({categories}: {categories: Array<string>}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {

    const params = new URLSearchParams(searchParams);
    console.log(name, category);
    if (name != null && name.trim().length != 0) params.set('name', name);
    else params.delete('name');

    if (category != null && category.trim().length != 0 && category != 'all') params.set('category', category);
    else params.delete('category');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={'flex flex-col gap-4 fixed max-w-[200px]'}>
      <div className={'flex flex-col gap-1'}>
        <label className={'text-sm font-semibold'}>Search by product name</label>
        <input
          name={'name'}
          id={'name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={'input-text'}
          type={'text'}
          placeholder={'Product Name'} />
      </div>
      <div className={'flex flex-col gap-1'}>
        <label className={'text-sm font-semibold'}>Categories</label>
        <div className={'grid grid-cols-1 gap-1'}>
          <div className={'flex flex-row gap-2'}>
            <input
              name={'category'}
              type={'radio'}
              value={"all"}
              id='all'
              checked={category === 'all'}
              onChange={() => setCategory('all')}/>
            <label htmlFor={'all'} className={'text-sm cursor-pointer capitalize'}>All categories</label>
          </div>
          {categories.map((cat,index) => (
            <div className={'flex flex-row gap-2'} key={index}>
              <input
                name={'category'}
                id={index.toString()}
                type={'radio'}
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}/>
              <label htmlFor={index.toString()} className={'text-sm cursor-pointer capitalize'}>{cat}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSearch} className={'main-form-button'} type="submit">Search</button>
    </div>
  );
}
