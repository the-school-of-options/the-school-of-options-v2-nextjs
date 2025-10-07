'use client'

export const WorkshopFooter = () => {
  return (
    <footer className="mt-16 border-t border-black/5 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The School of Options. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <span className="opacity-30">•</span>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <span className="opacity-30">•</span>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


