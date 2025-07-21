import React from "react";

function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-xs text-muted-foreground">
            © {`${new Date().getFullYear()}`} Rick and Morty API.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
