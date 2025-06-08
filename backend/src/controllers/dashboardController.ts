import { Request, Response } from "express";
import prisma from "../client/prismaClient";
import { startOfYear, endOfYear } from "date-fns";

const getEntriesByMonth = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const year = now.getFullYear();

    const start = startOfYear(now);
    const end = endOfYear(now);

    // Fetch all created_at timestamps for the current year
    const entries = await prisma.inquiries.findMany({
      where: {
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        created_at: true,
      },
    });

    // Initialize all months with 0
    const monthMap: Record<string, number> = {};
    for (let month = 1; month <= 12; month++) {
      const key = `${year}-${String(month).padStart(2, "0")}`;
      monthMap[key] = 0;
    }

    // Fill in actual counts
    for (const entry of entries) {
      const month = entry.created_at.toISOString().slice(0, 7); // "YYYY-MM"
      if (monthMap[month] !== undefined) {
        monthMap[month]++;
      }
    }

    // Format result
    const result = Object.entries(monthMap).map(([month, total]) => ({
      month,
      total,
    }));

    res.json({ success: true, data: result });
    return;
  } catch (err) {
    console.error("Error in /entries-by-month:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export default getEntriesByMonth;
