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
import PythonLogo from "./logos/PythonLogo";
import JavaLogo from "./logos/JavaLogo";

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
      <h2 className="mx-auto w-max text-4xl font-bold mt-24 mb-8">
        My Developer Skills
      </h2>
      <div className="flex gap-6">
        <Card className="flex flex-col gap-2 basis-1 grow bg-default-100 h-max px-4 pb-6 pt-2">
          <CardHeader>
            <h3 className="text-center w-full font-semibold text-2xl mb-2">
              Tools
            </h3>
          </CardHeader>
          <div className="grid grid-cols-3 gap-y-4">
            <VercelLogo className="w-16 h-16 mx-auto dark:invert" />
            <VSCodeLogo className="w-16 h-16 mx-auto" />
            <OpenAILogo className="w-16 h-16 mx-auto dark:invert" />
            <ProxmoxLogo className="w-16 h-16 mx-auto" />
            <CloudflareLogo className="w-16 h-16 mx-auto" />
            <DockerLogo className="w-16 h-16 mx-auto" />
          </div>
        </Card>
        <Card className="flex flex-col gap-4 basis-1 grow bg-default-100 h-max px-4 pb-6 pt-2">
          <CardHeader>
            <h3 className="text-center w-full font-semibold text-2xl mb-2">
              Programming Languages
            </h3>
          </CardHeader>
          <div className="grid grid-cols-3">
            <FaRust className="w-16 h-16 mx-auto gap-4" color="#D34516" />
            <BiLogoTypescript className="w-16 h-16 mx-auto" color="#3178C6" />
            <CppLogo className="w-16 h-16 mx-auto" />
          </div>
          <hr className="my-3 text-default-300" />
          <h3 className="text-center w-full font-semibold text-xl mb-2">
            Secondary Languages
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <PythonLogo className="w-16 h-16 mx-auto" />
            <JavaLogo className="w-16 h-16 mx-auto" />
            <CSharpLogo className="w-16 h-16 mx-auto" />
            <CLogo className="w-16 h-16 mx-auto" />
            <LuaLogo className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-center">
            *I have used these languages before, but I would likely need the
            help of the internet or AI to use them again.
          </p>
        </Card>
        <Card className="flex flex-col gap-2 basis-1 grow bg-default-100 h-max px-4 pb-6 pt-2">
          <CardHeader>
            <h3 className="text-center w-full font-semibold text-2xl mb-2">
              Frameworks
            </h3>
          </CardHeader>
          <div className="grid grid-cols-3">
            <ReactLogo className="w-16 h-16 mx-auto" />
            <NextjsLogo className="w-16 h-16 mx-auto dark:invert" />
            <TauriLogo className="w-16 h-16 mx-auto" />
          </div>
        </Card>
      </div>
    </div>
  );
}
