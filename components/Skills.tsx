import { Card, CardHeader } from "@heroui/react";
import { FaRust } from "react-icons/fa";
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
import { ReactNode } from "react";

export default function Skills() {
  return (
    <div className="2xl:max-w-[100rem] lg:max-w-[80rem] max-w-[32rem] mx-auto px-4">
      <h2 className="w-full text-center text-4xl 2xl:text-6xl font-bold md:mt-24 mt-16 md:mb-8 mb-6 text-wrap">
        My Developer Skills
      </h2>
      <div className="flex lg:flex-row flex-col md:gap-6 gap-4">
        <SkillsCard title="Tools">
          <div className="grid grid-cols-3 gap-y-4 mb-2">
            <VercelLogo className="w-16 h-16 mx-auto dark:invert" />
            <VSCodeLogo className="w-16 h-16 mx-auto" />
            <OpenAILogo className="w-16 h-16 mx-auto dark:invert" />
            <ProxmoxLogo className="w-16 h-16 mx-auto" />
            <CloudflareLogo className="w-16 h-16 mx-auto" />
            <DockerLogo className="w-16 h-16 mx-auto" />
          </div>
        </SkillsCard>
        <SkillsCard title="Programming Languages">
          <div className="grid grid-cols-3 gap-y-4">
            <FaRust className="w-16 h-16 mx-auto gap-4" color="#D34516" />
            <BiLogoTypescript className="w-16 h-16 mx-auto" color="#3178C6" />
            <CppLogo className="w-16 h-16 mx-auto" />
          </div>
          <hr className="my-3 text-default-300" />
          <h3 className="text-center w-full font-semibold text-xl 2xl:text-3xl mb-2">
            Secondary Languages<sup>*</sup>
          </h3>
          <div className="grid grid-cols-3 gap-y-4">
            <PythonLogo className="w-16 h-16 mx-auto" />
            <JavaLogo className="w-16 h-16 mx-auto" />
            <CSharpLogo className="w-16 h-16 mx-auto" />
            <CLogo className="w-16 h-16 mx-auto" />
            <LuaLogo className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-center mt-4 2xl:text-lg text-sm text-default-500">
            <sup>*</sup>I have used these languages before, but I would likely
            need the help of the internet or AI to use them again.
          </p>
        </SkillsCard>
        <SkillsCard title="Frameworks">
          <div className="grid grid-cols-3 gap-y-4 mb-2">
            <ReactLogo className="w-16 h-16 mx-auto" />
            <NextjsLogo className="w-16 h-16 mx-auto dark:invert" />
            <TauriLogo className="w-16 h-16 mx-auto" />
          </div>
        </SkillsCard>
      </div>
    </div>
  );
}

function SkillsCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Card className="flex flex-col gap-2 h-full lg:basis-1 grow bg-default-100 md:h-max min-h-max px-4 pb-6 pt-2">
      <CardHeader>
        <h3 className="text-center w-full font-semibold text-2xl 2xl:text-4xl mb-2">
          {title}
        </h3>
      </CardHeader>
      {children}
    </Card>
  );
}
