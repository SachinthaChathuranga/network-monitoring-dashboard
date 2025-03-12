import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { removeFromBlackList } from "../../redux/blackListSlice";

export default function BlacklistedSites({ sites }) {
  const networkList = useSelector((state) => state.blacklist.blackListedIPs);
  const [isShowIPList, setIsShowIPList] = useState(false);
  const dispatch = useDispatch();

  const blacklistedIPs = networkList.filter(
    (ip) => ip.restrictionType === "restricted"
  );

  const allowedIPs = networkList.filter((ip) => ip.restrictionType === "allow");

  const handleClickEdit = () => {
    setIsShowIPList(true);
  };
  const handleClickClosedEdit = () => {
    setIsShowIPList(false);
  };

  const handleDelete = (ip) => {
    dispatch(removeFromBlackList(ip));
  };

  return (
    <div className="p-2 border-2 border-blue-500 rounded-lg">
      <div className="flex justify-center items-center">
        <h2 className="font-bold text-center text-lg text-blue-500">
          Blacklisted Sites
        </h2>
        <span className="text-blue-300 ml-1 pt-1 hover:cursor-pointer hover:text-blue-500">
          <BiEditAlt onClick={() => handleClickEdit()} />
        </span>
      </div>
      <ul>
        {/* {sites.map((site, index) => (
          <li
            key={index}
            className="p-2 bg-blue-400 rounded-md my-1 text-blue-900 flex justify-between"
          >
            <span>{site.name}</span>

            <span className="bg-blue-900 text-white px-2 rounded-full">
              {site.count}
            </span>
          </li>
        ))} */}
        {blacklistedIPs.length > 0 ? (
          blacklistedIPs.map((ip, index) => (
            <li
              key={index}
              className="p-2 bg-blue-400 rounded-md my-1 text-blue-900 flex justify-between"
            >
              {/* <strong>Name:</strong> {ip.name}, <strong>IP:</strong> {ip.ip}, <strong>DNS:</strong> {ip.dns}, <strong>Restriction:</strong> {ip.restrictionType} */}
              <span>{ip.name}</span>

              <span className="bg-blue-900 text-white px-2 rounded-full">
                {/* {ip.count} */}#
              </span>
            </li>
          ))
        ) : (
          <p className="text-center mt-10 italic text-blue-400 mb-20">
            No IPs blacklisted yet.
          </p>
        )}
      </ul>

      {isShowIPList && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-2/6 border-4 border-red-500 bg-white rounded-lg pb-4 px-2">
            <button
              onClick={() => handleClickClosedEdit()}
              className="absolute rounded-full h-6 w-6 right-2 top-1 text-red-500 text-3xl"
            >
              <IoIosCloseCircle />
            </button>

            <div className="">
              <h1 className="font-bold text-center text-xl text-blue-500 pt-6">
                Blacked List
              </h1>
              <div>
                <ul className="h-[40vh] overflow-x-auto">
                  {blacklistedIPs.length > 0 ? (
                    blacklistedIPs.map((ip, index) => (
                      <li
                        key={index}
                        className="p-2 bg-blue-400 rounded-md my-1 text-blue-900 grid grid-cols-8 items-center gap-2"
                      >
                        <span className="col-span-3">{ip.name}</span>
                        <span className="col-span-3">{ip.ipv4}</span>
                        <span className="bg-blue-900 text-white  rounded-full text-center flex justify-center">
                          {/* {ip.count} */}#
                        </span>
                        <span className="text-xl cursor-pointer text-blue-600 hover:text-red-500 flex justify-end">
                          <MdDelete onClick={() => handleDelete(ip.ipv4)} />
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-center mt-20 italic text-blue-400">
                      No IPs blacklisted yet.
                    </p>
                  )}
                </ul>
              </div>
            </div>

            <div className="">
              <h1 className="font-bold text-center text-xl text-blue-500 pt-6">
                Allowed List
              </h1>
              <div>
                <ul className="overflow-x-auto h-[20vh]">
                  {allowedIPs.length > 0 ? (
                    allowedIPs.map((ip, index) => (
                      <li
                        key={index}
                        className="p-2 bg-blue-400 rounded-md my-1 text-blue-900 grid grid-cols-8 items-center gap-2"
                      >
                        <span className="col-span-3">{ip.name}</span>
                        <span className="col-span-3">{ip.ipv4}</span>
                        <span className="bg-blue-900 text-white  rounded-full text-center flex justify-center">
                          {/* {ip.count} */}#
                        </span>
                        <span className="text-xl cursor-pointer text-blue-600 hover:text-red-500 flex justify-end">
                          <MdDelete onClick={() => handleDelete(ip.ipv4)} />
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-center mt-10 italic text-blue-400">
                      No IPs Allowed yet.
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
