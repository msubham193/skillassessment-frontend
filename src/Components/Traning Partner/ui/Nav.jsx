import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../../../components(shadcn)/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components(shadcn)/ui/tooltip";
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AddTeacher from '../../../Pages/Traning Partner/AddTeacher';

export function Nav({ links, isCollapsed }) {
  const [variant, setVariant] = useState('ghost');

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={`/trainingPartner/dashboard/${link.path}`}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                to={`/trainingPartner/dashboard/${link.path}`}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}

Nav.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired, // Make sure each link object has a path property
      icon: PropTypes.elementType.isRequired,
      variant: PropTypes.oneOf(["default", "ghost"]).isRequired,
    })
  ).isRequired,
};
