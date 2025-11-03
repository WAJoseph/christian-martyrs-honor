import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/ui/Navigation";

// NOTE: Supabase mock is now handled in jest.setup.js globally

describe("Navigation", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (usePathname as jest.Mock).mockReset();
  });

  it("highlights the current page in the navigation", () => {
    // Mock current path to be /gallery
    (usePathname as jest.Mock).mockReturnValue("/gallery");

    const { container } = render(<Navigation />);

    // The desktop nav's active icon should have the "gold-text" class when active
    const galleryIcon = container.querySelector('a[href="/gallery"] svg');
    const timelineIcon = container.querySelector('a[href="/timeline"] svg');
    const communityIcon = container.querySelector('a[href="/community"] svg');

    expect(galleryIcon).toHaveClass("gold-text");
    expect(timelineIcon).not.toHaveClass("gold-text");
    expect(communityIcon).not.toHaveClass("gold-text");
  });

  it("shows all main navigation links", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    const { container } = render(<Navigation />);

    // Verify the primary anchor links exist
    expect(container.querySelector('a[href="/gallery"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/timeline"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/community"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="/donate"]')).toBeInTheDocument();
  });
});
