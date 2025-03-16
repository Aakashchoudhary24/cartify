import { render, screen, fireEvent } from "@testing-library/react";
import ProductsPage from "../page";
import { vi } from "vitest";
import { useFetchGraphQL } from "@/hooks";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom/vitest";

// Mock hooks
vi.mock("@/hooks", () => ({
  useFetchGraphQL: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    (useFetchGraphQL as jest.Mock).mockReturnValue({
      data: {
        products: [
          {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            price: 2000,
            category: { name: "Category 1" },
            gender: "Men",
            image1: "image1.jpg",
            image2: "image2.jpg",
          },
          {
            id: "2",
            name: "Product 2",
            description: "Description 2",
            price: 5000,
            category: { name: "Category 2" },
            gender: "Women",
            image1: "image3.jpg",
            image2: "image4.jpg",
          },
        ],
      },
      loading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the products correctly", () => {
    render(<ProductsPage />);
    
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("filters products by category", () => {
    render(<ProductsPage />);
    
    const categoryButton = screen.getByText("Category 1");
    fireEvent.click(categoryButton);
    
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  it("filters products by gender", () => {
    render(<ProductsPage />);
    
    const genderButton = screen.getByText("Men");
    fireEvent.click(genderButton);
    
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  it("resets filters when clicking reset button", () => {
    render(<ProductsPage />);
    
    const resetButton = screen.getByText("Reset Filters");
    fireEvent.click(resetButton);
    
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
