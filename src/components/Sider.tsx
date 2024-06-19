import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "@/lib/auth";
import { useUser } from "@/lib/auth";
import { routes } from "@/lib/route";

// Next UI Components
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

export function Sider() {
  const navigate = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const [width, setWidth] = useState(true);

  const [showSubRoutes, setShowSubRoutes] = useState(true);

  const logout = () => {
    signOut().then(() => {
      return navigate.push("/");
    });
  };

  return (
    <div
      className={` h-screen ${
        width ? "w-[16rem]" : "w-[7rem]"
      } bg-primary pt-4 hidden  md:flex flex-col items-center`}
    >
      <div
        className={`flex flex-col ${
          width ? "items-start" : "items-center"
        }  border-b border-b-white py-4  w-full px-4`}
      >
        <div className="flex items-center">
          <Image
            src="/images/abs_logo.svg"
            alt="logo"
            width={60}
            height={60}
            className="brightness-0 invert"
          />
        </div>
        {/* <h1 className="text-white font-semibold text-lg leading-4">
          ASIAN BOX STOP
        </h1> */}
        {/* <h1 className="text-white text-sm">
          {user ? user.email : "ABS ADMIN"}
        </h1> */}
      </div>

      {/* Items */}
      <div className="flex flex-col justify-between w-full h-full ">
        <div
          className={`flex flex-col text-white my-4 items-start w-full cursor-pointer`}
        >
          {routes.map(({ title, slug, icon, subRoutes }) => {
            return (
              <div key={slug} className="w-full">
                <Button
                  color="primary"
                  variant="solid"
                  radius="none"
                  className={`h-14 w-full px-4 py-2 uppercase flex items-center
                   ${width ? "justify-start" : "justify-center"}   
                   ${
                     pathname === slug
                       ? " bg-black"
                       : "text-white  hover:bg-black/50"
                   }  
                  `}
                  onClick={() => {
                    navigate.push(slug);
                  }}
                  startContent={
                    <div className="w-8 h-8  flex items-center justify-center">
                      <Image src={icon} alt="icon" width={28} height={28} />
                    </div>
                  }
                >
                  {width && title}

                  {/* {title === "Menu" && (
                    <Image
                      src={"/icons/arrow_down_white.svg"}
                      alt="icon"
                      width={20}
                      height={20}
                      className={showSubRoutes ? "" : "rotate-180"}
                      onClick={() => {
                        setShowSubRoutes(!showSubRoutes);
                      }}
                    />
                  )} */}
                </Button>
                {/* Render subroutes */}
                <div className="">
                  {showSubRoutes &&
                    subRoutes &&
                    subRoutes.map((subRoute) => (
                      <Button
                        color="primary"
                        variant="solid"
                        radius="none"
                        key={subRoute.slug}
                        className={`h-14 w-full px-4 py-2   justify-start uppercase  flex items-center 
                         ${
                           pathname === subRoute.slug
                             ? " bg-black"
                             : "text-white hover:bg-black/50"
                         }  `}
                        onClick={() => {
                          navigate.push(subRoute.slug);
                        }}
                        startContent={
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                              src={subRoute.icon}
                              alt="icon"
                              width={20}
                              height={20}
                            />
                          </div>
                        }
                      >
                        {width && subRoute.title}
                      </Button>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col">
          <Button
            color="default"
            onClick={logout}
            className={`mb-4  uppercase text-white text-left flex items-center    ${
              width ? "justify-start mx-4 " : "justify-center mx-2"
            }   hover:bg-black `}
          >
            <Image
              src="/icons/signout_white.svg"
              alt="signout"
              width={20}
              height={20}
            />
            {width && "Cerrar sesión"}
          </Button>

          {/* <div
            className="w-full bg-white h-10 flex items-center justify-center text-black cursor-pointer"
            onClick={() => setWidth((prev) => !prev)}
          >
            {" "}
            {!width ? ">>" : "<<"}
          </div> */}
        </div>
      </div>
    </div>
  );
}
