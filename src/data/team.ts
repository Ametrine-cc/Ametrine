import type { ImageMetadata } from "astro";
import noticxs from "../assets/team/noticxs.png";
import phyzzic from "../assets/team/phyzzic.png";

export type Member = {
    name: string;
    title: string;
    role: string;
    photo: ImageMetadata;
    pixelated?: boolean;
};

export const team: Member[] = [
    {
        name: "Noticxs",
        title: "Founder and CEO",
        role: "Software developer",
        photo: noticxs,
        pixelated: true,
    },
    {
        name: "Phyzzic",
        title: "Co-founder and CTO",
        role: "Website developer",
        photo: phyzzic,
    },
];
