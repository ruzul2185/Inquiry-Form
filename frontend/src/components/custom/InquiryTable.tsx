import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InquiryActions from "./InquiryActions";

import type { Inquiry } from "../../types/InquiryTypes";

interface InquiryTableProps {
  inquiries: Inquiry[];
  loading: boolean;
  skeletonRows?: number;
  onView: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}

const InquiryTable: React.FC<InquiryTableProps> = ({
  inquiries,
  loading,
  skeletonRows = 5,
  onSuccess,
}) => {
  return (
    <Table>
      <TableCaption>Recent inquiries submitted by users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">ID</TableHead>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Phone</TableHead>
          <TableHead className="text-right">Age</TableHead>
          <TableHead className="text-left">Gender</TableHead>
          <TableHead className="text-left">Email</TableHead>
          <TableHead className="text-left">Reference</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: skeletonRows }).map((_, idx) => (
              <TableRow key={`skeleton-${idx}`}>
                {Array.from({ length: 9 }).map((__, i) => (
                  <TableCell key={i}>
                    <div className="h-4 bg-gray-300 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No inquiries found.
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-right">{entry.id}</TableCell>
                <TableCell className="text-left">{entry.full_name}</TableCell>
                <TableCell className="text-left">{entry.phone_number}</TableCell>
                <TableCell className="text-right">{entry.age}</TableCell>
                <TableCell className="text-left">{entry.gender}</TableCell>
                <TableCell className="text-left">{entry.email ?? "—"}</TableCell>
                <TableCell className="text-left">{entry.reference}</TableCell>
                <TableCell className="text-right">
                  {new Date(entry.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <InquiryActions
                    id={entry.id}
                    onSuccess={onSuccess}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
      </TableBody>
    </Table>
  );
};

export default InquiryTable;
