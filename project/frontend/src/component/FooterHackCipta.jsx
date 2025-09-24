import React from "react";

export default function FooterHackCipta({
  companyName = "Hack Cipta",
  copyrightYear = new Date().getFullYear(),
}) {
  return (
    <footer
      className="bg-success bg-opacity-75 shadow-lg border-top border-white border-opacity-25 py-3"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="container text-center">
        <p className="mb-1 fw-bold text-light">{companyName}</p>
        <small className="text-white-50">
          © {copyrightYear} {companyName}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
