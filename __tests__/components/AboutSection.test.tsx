import { render, screen } from "@testing-library/react";
import AboutSection from "@/app/_components/AboutSection";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AboutSection", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the about section content", () => {
    const props = {
      title: "Test Title",
      content: ["Test content"],
      stats: [{ label: "Test Label", value: "Test Value", key: "test" }],
      image: {
        url: "/test-image.jpg",
        description: "Test image",
      },
    };

    render(<AboutSection {...props} />);
    expect(
      screen.getByRole("heading", { name: "Witnesses of the Light" })
    ).toBeInTheDocument();
  });
});
