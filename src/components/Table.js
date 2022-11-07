import React, { useEffect, useState } from "react";
import { data } from "../util/data";
import { Rings } from "react-loader-spinner";
import {getImage,retrieveContribution,getFollowers,getRep,getUserName} from "../util/apiCalls"

const Table = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")

  useEffect(() => {
    setLoading(true);
    data.forEach((item) => {
      const name = getUserName(item.github);
      async function OnLoad(id) {
        const contribution = await retrieveContribution(id);
        const followers = await getFollowers(id);
        const totalRep = await getRep(id);
        const imgUrl=await getImage(id)
        const obj = {
          ...item,
          userName: id,
          contribution: contribution,
          followers: followers,
          totalRep: totalRep,
          imgUrl,

        };
        setUser((prev) => [...prev, obj]);
        setLoading(false);
        return obj;
      }
      OnLoad(name);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col bg-cyan-500 items-center min-h-screen justify-center">
        {loading?<Rings color="rgb(37 99 235)" />: <><div className="relative col-span-12 flex gap-4">
          <input
            type="search"
            id="default-search"
            className="block p-4  text-black bg-blue-200 rounded-lg border placeholder-gray-500   "
            placeholder="Search Username"
            required={true} onChange={e=>setSearch(e.target.value)}
          ></input>
          <button
            type="submit"
            className="flex justify-around items-center text-gray-900  font-semibold bg-blue-400 hover:bg-blue-600 hover:text-white focus:outline-none rounded-lg text-sm px-4 py-2 "
          >
            Search
            <span className="pl-3 pointer-events-none ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-900 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="flex items-center mt-8 justify-center min-h-[50%] bg-inherit">
          <div className="col-span-12">
            <div className="overflow-auto lg:overflow-visible ">
              <table className="table text-gray-400 border-separate  hover:border-collapse  space-y-6 text-sm">
                <thead className="bg-blue-200 text-gray-600">
                  <tr>
                    <th className="p-3 underline underline-offset-4 ">Name</th>
                    <th className="p-3 underline underline-offset-4  text-left">Contributions</th>
                    <th className="p-3 underline underline-offset-4  text-left">Followers</th>
                    <th className="p-3 underline underline-offset-4  text-left">Repo Count</th>
                    <th className="p-3 underline underline-offset-4  text-left">Field A</th>
                    <th className="p-3 underline underline-offset-4  text-left">Field B</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((item, index) => {
                    return (
                      <tr key={index} className="bg-blue-200">
                        <td className="p-3   ">
                          <div className="flex items-center justify-between  ">
                            <img
                              className="-full h-12 w-12  object-cover mr-3"
                              src={item.imgUrl}
                              alt="image"
                            />
                              <div className="text-gray-600">
                                {item.userName}
                              </div>
                          </div>
                        </td>
                        <td className="p-3    text-gray-600 font-semibold">
                          {item.contribution}
                        </td>
                        <td className="p-3    text-gray-600 font-semibold">
                          {item.followers}
                        </td>
                        <td className="p-3  text-gray-600 font-semibold ">
                          {item.totalRep}
                        </td>
                        <td className="p-3   text-gray-600 font-semibold  ">
                          {item.fieldA}
                        </td>
                        <td className="p-3   text-gray-600 font-semibold  ">
                          {item.fieldB}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div></>}
      </div>
    </>
  );
};

export default Table;
