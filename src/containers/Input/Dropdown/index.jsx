import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropdownMenu = ({ algorithm, setAlgorithm, setShowOutput }) => {
  const handleSelection = (e) => {
    setAlgorithm(e.target.title);
    setShowOutput(false);
  };
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Algorithms
      </label>
      <div>
        <Menu.Button className="inline-flex mb-4 w-60 rounded-md border border-gray-300 bg-white pl-2 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {algorithm}
          <ChevronDownIcon
            className="absolute right-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -mt-2 left-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={(e) => handleSelection(e)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  title="First Come First Serve, FCFS"
                >
                  First Come First Serve, FCFS
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={(e) => handleSelection(e)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  title="Shortest Job First, SJF"
                >
                  Shortest Job First, SJF
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={(e) => handleSelection(e)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  title="Shortest Job First, SJF (P)"
                >
                  Shortest Job First, SJF (P)
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={(e) => handleSelection(e)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  title="Priority Scheduling"
                >
                  Priority Scheduling
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={(e) => handleSelection(e)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  title="Round Robin, RR"
                >
                  Round Robin, RR
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
