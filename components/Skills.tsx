import { Card, CardBody, CardHeader } from "@heroui/react";
import NextImage from "next/image";
import { FaJava, FaPython, FaReact, FaRust } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import CppLogo from "./logos/CppLogo";
import CLogo from "./logos/CLogo";
import CSharpLogo from "./logos/CSharpLogo";
import LuaLogo from "./logos/LuaLogo";
import ReactLogo from "./logos/ReactLogo";
import NextjsLogo from "./logos/NextjsLogo";
import TauriLogo from "./logos/TauriLogo";
import VercelLogo from "./logos/VercelLogo";
import VSCodeLogo from "./logos/VSCodeLogo";
import OpenAILogo from "./logos/OpenAILogo";
import ProxmoxLogo from "./logos/ProxmoxLogo";
import CloudflareLogo from "./logos/CloudflareLogo";
import DockerLogo from "./logos/DockerLogo";

/* Developer Skills
Programming Languages 
Rust, Typescript, C++
Dabbled Languages
Python, Java, C#, C, 6502 assembly, x86 assembly, Lua, Bash scripting, 

Frameworks
Next.js, React, Embassy, Tauri

Tools
Vercel, VS Code, OpenAI developer platform (AI), Proxmox, Cloudflare, Docker
*/

export default function Skills() {
  return (
    <div className="max-w-[80rem] mx-auto px-8">
      <h2 className="mx-auto w-max text-4xl font-bold mt-24 mb-4">
        My Developer Skills
      </h2>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 basis-1 grow">
          <h3 className="mx-auto w-max font-semibold text-xl">Tools</h3>
          <div className="grid grid-cols-3">
            <VercelLogo className="w-16 h-16 mx-auto" />
            <VSCodeLogo className="w-16 h-16 mx-auto" />
            <OpenAILogo className="w-16 h-16 mx-auto" />
            <ProxmoxLogo className="w-16 h-16 mx-auto" />
            <CloudflareLogo className="w-16 h-16 mx-auto" />
            <DockerLogo className="w-16 h-16 mx-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2 basis-1 grow">
          <h3 className="mx-auto w-max font-semibold text-xl">
            Programming Languages
          </h3>
          <div className="grid grid-cols-3">
            <FaRust className="w-16 h-16 mx-auto gap-4" color="#D34516" />
            <BiLogoTypescript className="w-16 h-16 mx-auto" color="#3178C6" />
            <CppLogo className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="mx-auto w-max font-semibold text-xl mt-4">
            Dabbled Languages
          </h3>
          <p className=" text-center ">
            I have used these languages before, but I would likely need the help
            of the internet or AI to use them again.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <FaPython className="w-16 h-16 mx-auto" />
            <FaJava className="w-16 h-16 mx-auto" />
            <CSharpLogo className="w-16 h-16 mx-auto" />
            <CLogo className="w-16 h-16 mx-auto" />
            <LuaLogo className="w-16 h-16 mx-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2 basis-1 grow">
          <h3 className="mx-auto w-max font-semibold text-xl">Frameworks</h3>
          <div className="grid grid-cols-3">
            <ReactLogo className="w-16 h-16 mx-auto" />
            <NextjsLogo className="w-16 h-16 mx-auto" />
            <TauriLogo className="w-16 h-16 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
