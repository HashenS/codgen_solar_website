import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full rounded-t-xl bg-surface-container-lowest border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <div className="font-headline-md text-headline-md font-bold text-primary mb-6">
            Codegen Solar
          </div>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Precision engineering for a sustainable future.
          </p>
        </div>
        
        <div>
          <h6 className="text-primary font-bold font-label-caps text-label-caps mb-6">
            TECHNOLOGY
          </h6>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Hybrid Inverters
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Nexus OS
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Solar Storage
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="text-primary font-bold font-label-caps text-label-caps mb-6">
            COMPANY
          </h6>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Sustainability Report
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h6 className="text-primary font-bold font-label-caps text-label-caps mb-6">
            CONTACT
          </h6>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Press Kit
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                System Support
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
                Find an Installer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
        <p className="text-on-surface-variant font-label-caps text-label-caps">
          © {new Date().getFullYear()} Codegen Solar. Precision Engineering for a Sustainable Future.
        </p>
      </div>
    </footer>
  );
};
