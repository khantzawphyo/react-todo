import React from "react";
import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <span>Built with</span>
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span>by</span>
          <a
            href="https://github.com/khantzawphyo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-800 underline-offset-2 transition-colors hover:text-slate-900 hover:underline"
          >
            Khant Zaw Phyo
          </a>
        </div>

        <a
          href="https://github.com/khantzawphyo/react-todo"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-800"
        >
          <Github className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span>View code on GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
