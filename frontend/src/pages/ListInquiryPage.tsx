import AddInquiryDialog, { type NewInquiryData } from "@/components/custom/AddInquiryDialog";
import InquiryPagination from "@/components/custom/InquiryPagination";
import InquiryTable from "@/components/custom/InquiryTable";
import type { Inquiry, InquiryListProps } from "@/types/InquiryTypes";
import { fetchGET, fetchPOST } from "@/utils/FetchUtils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const ListInquiryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [pagination, setPagination] = useState({
    page: pageFromUrl,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: pageFromUrl,
    }));
  }, [pageFromUrl]);

  const fetchInquiries = async () => {
      setLoading(true);
      try {
        const url = new URL(import.meta.env.VITE_INQUIRY_ENDPOINT);
        url.searchParams.append("page", pagination.page.toString());
        url.searchParams.append("pageSize", pagination.pageSize.toString());

        const json: InquiryListProps = await fetchGET(url.toString());
        setInquiries(json.data);
        setPagination((prev) => ({
          ...prev,
          total: json.pagination.total,
          totalPages: json.pagination.totalPages,
        }));
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchInquiries();
  }, [pagination.page, pagination.pageSize]);

  const onPageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= pagination.totalPages &&
      newPage !== pagination.page
    ) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  const handleView = (id: string) => {
    alert(`View inquiry ${id}`);
  };

  const handleUpdate = (id: string) => {
    alert(`Update inquiry ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      alert(`Delete inquiry ${id}`);
    }
  };

  // Handler for new inquiry submission from dialog
  const handleAddInquiry = async (newInquiry: NewInquiryData) => {
    try {
      const url = import.meta.env.VITE_INQUIRY_ENDPOINT;
      await fetchPOST(url, newInquiry);

      setIsAddDialogOpen(false); // Close dialog on success
      setPagination((prev) => ({ ...prev, page: 1 })); // Reset page to refetch

      toast.success("Inquiry added successfully!");
      fetchInquiries();
    } catch (error: any) {
      toast.error(`Error adding inquiry: ${error.message || error}`);
      console.error("Add Inquiry Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Inquiry List
        <button onClick={() => setIsAddDialogOpen(true)}>Add Inquiry</button>
        <AddInquiryDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddInquiry}
        />
      </h1>

      <InquiryTable
        inquiries={inquiries}
        loading={loading}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onSuccess={fetchInquiries}
      />

      <InquiryPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ListInquiryPage;