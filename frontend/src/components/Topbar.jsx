import { useContext, useState, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { useLocation } from "react-router-dom"
import { useMultistepForm } from "../hooks/useMultistepForm"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createPost } from "../features/posts/postsActions"

import {
  MdSearch,
  MdSettings,
  MdHelp,
  MdOutlineFileUpload,
} from "react-icons/md"
import {
  IoNotificationsSharp,
  IoPersonCircleOutline,
  IoPersonCircleSharp,
  IoPeopleCircleSharp,
  IoPeopleCircleOutline,
} from "react-icons/io5"
import { IoMdChatbubbles } from "react-icons/io"
import {
  BsHouseDoor,
  BsFillHouseFill,
  BsCollectionPlay,
  BsCollectionPlayFill,
  BsGridFill,
  BsPencilSquare,
  BsArrowRight,
  BsArrowLeft,
} from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { GoSignOut } from "react-icons/go"
import { RiBookOpenFill } from "react-icons/ri"

import DropdownMenu from "./Dropdown/DropdownMenu"
import DropdownItem from "./Dropdown/DropdownItem"
import Modal from "./Modal"
import PictForm from "./Form/PictForm"
import PostForm from "./Form/PostForm"

function Topbar() {
  const { account, dispatch } = useContext(AuthContext)
  const location = useLocation()
  const disptch = useDispatch()

  const [openMenu1, setOpenMenu1] = useState(false)
  const [openMenu2, setOpenMenu2] = useState(false)
  const menuRef1 = useRef()
  const menuRef2 = useRef()

  const [openModal, setOpenModal] = useState(false)

  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState("")
  const [loc, setLoc] = useState("")

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    nextStep,
    backStep,
  } = useMultistepForm([
    <PictForm
      onChange={(e) => e.target.files && setFile(e.target.files[0])}
      file={file}
      remove={() => setFile(null)}
    />,
    <PostForm
      file={file}
      caption={caption}
      setCaption={setCaption}
      location={loc}
      setLocation={setLoc}
    />,
  ])

  const onNextStep = (e) => {
    e.preventDefault()
    if (!isLastStep) return nextStep()

    const fd = new FormData()

    fd.append("caption", caption)
    fd.append("location", loc)
    fd.append("picture", file)

    disptch(createPost(fd))
    setOpenModal(false)
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-light flex justify-between items-center py-2 px-5 border-b">
      <div className="inline-flex items-center gap-x-3 w-[25rem]">
        <img
          src="/icons/Logo_Social_Elite.png"
          className="rounded-full w-10 h-10"
          alt="Facebook"
        />
        <div style={{ fontFamily: "Lobster" }} className="text-2xl">
          <span>Social</span>
          <span className="text-primary"> Elite</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MdSearch size={20} />
          </div>

          <input
            type="text"
            placeholder="Cari di Social Elite..."
            className="rounded-full bg-gray-100 py-1.5 px-3 pl-10 focus:outline-primary"
          />
        </div>
      </div>
      <ul className="inline-flex items-center gap-x-5 text-gray-500">
        <div>
          <Link to={"/"}>
            <li className="w-16 flex justify-center text-purple-500">
              {location.pathname === "/" ? (
                <BsFillHouseFill size={25} />
              ) : (
                <BsHouseDoor size={25} />
              )}
            </li>
          </Link>
          <div
            className={`${
              location.pathname === "/" ? "block" : "hidden"
            } rounded-full bg-primary w-full h-1 -mb-4 mt-3`}
          ></div>
        </div>
        <div>
          <li className="w-16 flex justify-center text-purple-500">
            {location.pathname === "/sds" ? (
              <BsCollectionPlayFill size={25} />
            ) : (
              <BsCollectionPlay size={25} />
            )}
          </li>
          <div
            className={`${
              location.pathname === "/sss" ? "block" : "hidden"
            } rounded-full bg-primary w-full h-1 -mb-4 mt-3`}
          ></div>
        </div>
        <div>
          <li className="w-16 flex justify-center text-purple-500">
            {location.pathname === "/adsa" ? (
              <IoPersonCircleSharp size={30} />
            ) : (
              <IoPersonCircleOutline size={30} />
            )}
          </li>
          <div
            className={`${
              location.pathname === "/sfsf" ? "block" : "hidden"
            } rounded-full bg-primary w-full h-1 -mb-4 mt-3`}
          ></div>
        </div>
        <div>
          <li className="w-16 flex justify-center text-purple-500">
            {location.pathname === "/sds" ? (
              <IoPeopleCircleSharp size={30} />
            ) : (
              <IoPeopleCircleOutline size={30} />
            )}
          </li>
          <div
            className={`${
              location.pathname === "/sefse" ? "block" : "hidden"
            } rounded-full bg-primary w-full h-1 -mb-4 mt-3`}
          ></div>
        </div>
      </ul>
      <ul className="w-[25rem] flex justify-end items-center gap-x-3">
        <li
          ref={menuRef1}
          onClick={() => setOpenMenu1(!openMenu1)}
          className={`rounded-full w-10 h-10 p-2 bg-gray-200 flex justify-center items-center cursor-pointer ${
            openMenu1 && "bg-purple-200 text-primary"
          }`}
        >
          <BsGridFill size={20} />
        </li>
        <DropdownMenu
          open={openMenu1}
          menuRef={menuRef1}
          close={() => setOpenMenu1(false)}
        >
          <>
            <h1 className="font-semibold text-lg py-1 px-2">Buat</h1>
            <DropdownItem
              icon={<BsPencilSquare size={20} />}
              name={"Postingan"}
              action={() => setOpenModal(true)}
            />
            <DropdownItem
              icon={<RiBookOpenFill size={20} />}
              name={"Cerita"}
              action=""
            />
          </>
        </DropdownMenu>
        <Link to={"/chats"}>
          <li
            className={`rounded-full w-10 h-10 p-2 flex justify-center items-center ${
              location.pathname === "/chats"
                ? "bg-purple-200 text-primary"
                : "bg-gray-200"
            }`}
          >
            <IoMdChatbubbles size={20} />
          </li>
        </Link>
        <li className="rounded-full w-10 h-10 p-2 bg-gray-200 flex justify-center items-center">
          <IoNotificationsSharp size={20} />
        </li>
        <li
          ref={menuRef2}
          onClick={() => setOpenMenu2(!openMenu2)}
          className="cursor-pointer"
        >
          <img
            src={
              account.profilePict
                ? process.env.REACT_APP_API_BASE_URL +
                  "/profilePictures/" +
                  account.profilePict
                : "/persons/blank_avatar.png"
            }
            className="rounded-full w-10 h-10"
            alt="Profile"
          />
        </li>
        <DropdownMenu
          open={openMenu2}
          menuRef={menuRef2}
          close={() => setOpenMenu2(false)}
        >
          <DropdownItem
            icon={<FaUser size={20} />}
            name={"Profil"}
            to={"/profile"}
          />
          <DropdownItem
            icon={<MdSettings size={25} />}
            name={"Pengaturan"}
            to={"/setings"}
          />
          <DropdownItem
            icon={<MdHelp size={25} />}
            name={"Bantuan"}
            to={"/help"}
          />
          <DropdownItem
            icon={<GoSignOut size={20} />}
            name={"Logout"}
            action={() => dispatch({ type: "LOGOUT" })}
          />
        </DropdownMenu>
      </ul>

      <Modal
        open={openModal}
        title={"Buat Postingan Baru"}
        onClose={() => setOpenModal(false)}
      >
        <form onSubmit={onNextStep}>
          {!isFirstStep && (
            <button onClick={backStep} className="flex items-center gap-x-3">
              <BsArrowLeft size={20} />
              <span className="font-semibold">Back</span>
            </button>
          )}
          <div className="flex justify-end">
            <span>
              {currentStepIndex + 1}/{steps.length}
            </span>
          </div>
          <div>{step}</div>
          {isLastStep ? (
            <div className="flex justify-end text-primary">
              <button type="submit" className="flex items-center gap-x-3">
                <span className="font-semibold">Bagikan</span>
                <MdOutlineFileUpload size={20} />
              </button>
            </div>
          ) : (
            file && (
              <div className="flex justify-end text-primary">
                <button type="submit" className="flex items-center gap-x-3">
                  <span className="font-semibold">Selanjutnya</span>
                  <BsArrowRight size={20} />
                </button>
              </div>
            )
          )}
        </form>
      </Modal>
    </header>
  )
}

export default Topbar
