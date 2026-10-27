"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { fadeUpItem, popItem, slideInItem } from "@/lib/motion";

type TaskStatus = "progress" | "done";

interface TaskRow {
  amount: string;
  status: TaskStatus;
  project?: string;
  assignee?: { name: string; avatar: string; due: string };
}

const TASKS: readonly TaskRow[] = [
  {
    amount: "$619,000",
    status: "progress",
    project: "Maintaining & Upgrade",
    assignee: { name: "Cristian Bauhe", avatar: "/images/avatar-cristian.png", due: "12 Day" },
  },
  {
    amount: "$251,000",
    status: "done",
    project: "Develop CRM Product",
    assignee: { name: "Raymond Baarthean", avatar: "/images/avatar-raymond.png", due: "24 Day" },
  },
  { amount: "$251,000", status: "done" },
];

const statusStyle: Record<TaskStatus, { label: string; className: string }> = {
  progress: { label: "◉ Progress⌄", className: "bg-mock-indigo" },
  done: { label: "◉ Done⌄", className: "bg-mock-mint" },
};

/* Entrance timing (s), relative to the parent card entering view. */
const WIDGET_DELAY = 0.15;
const ROWS_DELAY = 0.35;
const ROW_STAGGER = 0.14;

interface WidgetProps {
  className?: string;
}

/** Miniature task list card (Figma 4018:4906). */
export function TaskBoardWidget({ className }: WidgetProps) {
  return (
    <motion.div
      variants={fadeUpItem}
      custom={WIDGET_DELAY}
      dir="ltr"
      aria-hidden="true"
      className={cn(
        "flex w-[197px] flex-col gap-[4px] rounded-[7px] bg-white px-[7px] pb-[11px] pt-[7px] font-inter leading-normal text-mock-ink shadow-widget-ring",
        className,
      )}
    >
      {TASKS.map((task, index) => {
        const rowDelay = ROWS_DELAY + index * ROW_STAGGER;
        return (
          <motion.div
            key={index}
            variants={slideInItem}
            custom={rowDelay}
            className="flex flex-col gap-[3px] rounded-[4px] bg-mock-panel p-[5px]"
          >
            <div className="flex items-start justify-between">
              <p className="text-[8px] font-semibold">{task.amount}</p>
              <motion.p
                variants={popItem}
                custom={rowDelay + 0.2}
                className={cn(
                  "self-stretch rounded-[8px] px-[4px] py-[2px] text-[6px] font-semibold text-white",
                  statusStyle[task.status].className,
                )}
              >
                {statusStyle[task.status].label}
              </motion.p>
            </div>
            {task.project ? <p className="text-[6px] text-mock-muted">{task.project}</p> : null}
            {task.assignee ? (
              <div className="flex items-center gap-[5px] pt-[9px]">
                <motion.span variants={popItem} custom={rowDelay + 0.25} className="block shrink-0">
                  <Image
                    src={task.assignee.avatar}
                    alt=""
                    width={14}
                    height={14}
                    className="size-[14px] rounded-[7px] object-cover"
                  />
                </motion.span>
                <p className="text-[6px]">{task.assignee.name}</p>
                <p className="ms-auto pb-px text-[6px] text-mock-muted">◷ {task.assignee.due}</p>
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
