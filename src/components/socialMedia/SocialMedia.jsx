import React from "react";
import "./SocialMedia.scss";
import {usePortfolio} from "../../hooks/usePortfolio";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaGitlab,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMediumM,
  FaStackOverflow,
  FaKaggle
} from "react-icons/fa";

const networks = [
  {key: "github", className: "github", label: "GitHub", Icon: FaGithub},
  {key: "linkedin", className: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn},
  {key: "outlook", className: "outlook", label: "Email", Icon: FaEnvelope, mailto: true},
  {key: "gmail", className: "google", label: "Email", Icon: FaEnvelope, mailto: true},
  {key: "gitlab", className: "gitlab", label: "GitLab", Icon: FaGitlab},
  {key: "facebook", className: "facebook", label: "Facebook", Icon: FaFacebookF},
  {key: "instagram", className: "instagram", label: "Instagram", Icon: FaInstagram},
  {key: "twitter", className: "twitter", label: "Twitter / X", Icon: FaTwitter},
  {key: "medium", className: "medium", label: "Medium", Icon: FaMediumM},
  {key: "stackoverflow", className: "stack-overflow", label: "Stack Overflow", Icon: FaStackOverflow},
  {key: "kaggle", className: "kaggle", label: "Kaggle", Icon: FaKaggle}
];

export default function SocialMedia() {
  const {socialMediaLinks} = usePortfolio();
  if (!socialMediaLinks.display) {
    return null;
  }
  return (
    <div className="social-media-div">
      {networks.map(({key, className, label, Icon, mailto}) => {
        const value = socialMediaLinks[key];
        if (!value) {
          return null;
        }
        return (
          <a
            key={key}
            href={mailto ? `mailto:${value}` : value}
            className={`icon-button ${className}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon />
            <span></span>
          </a>
        );
      })}
    </div>
  );
}
