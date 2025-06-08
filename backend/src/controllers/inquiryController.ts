import { Request, Response } from 'express';
import prisma from '../client/prismaClient';
import calculateAge from '../utils/inquiryUtils';

import { Prisma } from '../../generated/prisma/index';

import { InquiryBodyInput } from '../types/appScriptTypes';

const getAllInquiries = async (req: Request, res: Response) => {
    try {

      // Parse pagination query parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Fetch total count for pagination metadata
        const totalCount = await prisma.inquiries.count();

        const inquiries = await prisma.inquiries.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                full_name: true,
                phone_number: true,
                date_of_birth: true,
                gender: true,
                email: true,
                reference: true,
                created_at: true,
            },
             orderBy: {
                created_at: 'desc',  // Sort by created_at descending
          },
        });

        if (!inquiries || inquiries.length === 0) {
            res.status(404).json({ message: 'No inquiries found' });
            return;
        }

        // Convert BigInt fields to strings
        const sanitized = inquiries.map(inquiry => {
            // Convert BigInt fields to string and compute age
            const sanitizedInquiry: any = {};

            for (const key in inquiry) {
                const value = inquiry[key as keyof typeof inquiry];
                sanitizedInquiry[key] = typeof value === 'bigint' ? value.toString() : value;
            }

            // Add age field
            sanitizedInquiry.age = calculateAge(sanitizedInquiry.date_of_birth);

            return sanitizedInquiry;
        });

        // Return response with pagination metadata
        res.status(200).json({
            data: sanitized,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
        return;
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

const getSelectedInquiry = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const id = BigInt(req.params.id);

        if (!id) {
            res.status(400).json({ error: 'Invalid inquiry ID' });
            return;
        }

        const inquiry = await prisma.inquiries.findUnique({where: { id }});

        if (!inquiry) {
            res.status(404).json({ message: 'Inquiry not found' });
            return;
        }

        const sanitizedInquiry = {
            ...inquiry,
            id: inquiry.id.toString(), // or any other BigInt field
            passing_year: inquiry.passing_year ? inquiry.passing_year.toString() : null,
            cgpa: inquiry.cgpa ? inquiry.cgpa.toString() : null,
            age: calculateAge(inquiry.date_of_birth)
        };
        
        res.json(sanitizedInquiry);
        return;
        
    } catch (error) {
        console.error('Error fetching inquiry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

const createInquiry = async (
  req: Request<{}, {}, Record<string, any>>,
  res: Response
): Promise<void> => {
  try {
    const body = req.body;

    // Basic required fields validation
    if (!body.phone_number) {
      res.status(400).json({ error: "Phone Number is required" });
      return;
    }
    if (!body.full_name) {
      res.status(400).json({ error: "Full Name is required" });
      return;
    }
    if (!body.date_of_birth) {
      res.status(400).json({ error: "Date of Birth is required" });
      return;
    }

    // Parse and validate phone_number as Prisma.Decimal
    let phone_number: Prisma.Decimal;
    try {
      phone_number = new Prisma.Decimal(body.phone_number);
    } catch {
      res.status(400).json({ error: "Invalid Phone Number format" });
      return;
    }

    // Parse and validate date_of_birth
    const dob = new Date(body.date_of_birth);
    if (isNaN(dob.getTime())) {
      res.status(400).json({ error: "Invalid Date of Birth format" });
      return;
    }

    // Optional numeric conversions for passing_year and cgpa
    const passing_year =
      body.passing_year && !isNaN(Number(body.passing_year))
        ? BigInt(body.passing_year)
        : null;

    const cgpa =
      body.cgpa && !isNaN(Number(body.cgpa))
        ? BigInt(Math.round(Number(body.cgpa)))
        : null;

    // Prepare data for Prisma
    const data: Prisma.inquiriesCreateInput = {
      full_name: body.full_name,
      phone_number,
      date_of_birth: dob,
      gender: body.gender || null,
      email: body.email || null,
      reference: body.reference || null,
      current_address: body.current_address || null,
      permanent_address: body.permanent_address || null,
      course_selection: body.course_selection || null,
      course_duration: body.course_duration || null,
      user_availability: body.user_availability || null,
      job_guarentee: body.job_guarentee || null,
      job_assistance: body.job_assistance || null,
      job_location: body.job_location || null,
      expected_package: body.expected_package || null,
      future_goal: body.future_goal || null,
      career_transition_reason: body.career_transition_reason || null,
      recent_education: body.recent_education || null,
      passing_year,
      cgpa,
    };

    console.log("Saving inquiry data:", data);

    await prisma.inquiries.create({ data });

    res.status(200).json({
      message: "Inquiry added successfully",
    });
  } catch (error) {
    console.error("Error adding inquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const patchInquiry = async (
  req: Request<{ id: string }, {}, Partial<InquiryBodyInput>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const inquiryId = BigInt(id);

    const existingInquiry = await prisma.inquiries.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry) {
      res.status(404).json({ message: "Inquiry not found" });
      return;
    }

    // Build update data object with only provided fields
    const data: Prisma.inquiriesUpdateInput = {};

    if (body.full_name !== undefined) data.full_name = body.full_name;
    if (body.phone_number !== undefined)
      data.phone_number = new Prisma.Decimal(body.phone_number);
    if (body.date_of_birth !== undefined)
      data.date_of_birth = new Date(body.date_of_birth);
    if (body.gender !== undefined) data.gender = body.gender;
    if (body.email !== undefined) data.email = body.email ?? null;
    if (body.reference !== undefined) data.reference = body.reference;
    if (body.current_address !== undefined)
      data.current_address = body.current_address || null;
    if (body.permanent_address !== undefined)
      data.permanent_address = body.permanent_address || null;
    if (body.course_selection !== undefined)
      data.course_selection = body.course_selection || null;
    if (body.course_duration !== undefined)
      data.course_duration = body.course_duration || null;
    if (body.user_availability !== undefined)
      data.user_availability = body.user_availability || null;
    if (body.job_guarentee !== undefined)
      data.job_guarentee = body.job_guarentee || null;
    if (body.job_assistance !== undefined)
      data.job_assistance = body.job_assistance || null;
    if (body.job_location !== undefined)
      data.job_location = body.job_location || null;
    if (body.expected_package !== undefined)
      data.expected_package = body.expected_package || null;
    if (body.future_goal !== undefined)
      data.future_goal = body.future_goal || null;
    if (body.career_transition_reason !== undefined)
      data.career_transition_reason = body.career_transition_reason || null;
    if (body.recent_education !== undefined)
      data.recent_education = body.recent_education || null;

    if (body.passing_year !== undefined && body.passing_year !== null) {
      if (!isNaN(Number(body.passing_year))) {
        data.passing_year = BigInt(body.passing_year as string | number);
      } else {
        data.passing_year = null;
      }
    }

    if (body.cgpa !== undefined) {
      if (!isNaN(Number(body.cgpa))) {
        data.cgpa = BigInt(Math.round(Number(body.cgpa)));
      } else {
        data.cgpa = null;
      }
    }

    const result = await prisma.inquiries.update({
      where: { id: inquiryId },
      data,
    });

    if (!result) {
      res.status(404).json({ message: "Inquiry not found" });
      return;
    }

    res.status(200).json({ message: "Inquiry patched successfully" });
  } catch (error) {
    console.error("Error patching inquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteInquiry = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const inquiryId = BigInt(id); // assuming `id` is BigInt in DB

    const existingInquiry = await prisma.inquiries.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry) {
        res.status(404).json({ message: 'Inquiry not found' });
        return;
    }

    await prisma.inquiries.delete({
      where: { id: inquiryId },
    });

    res.status(200).json({ message: 'Inquiry deleted successfully' });
    return;

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
};


export default { getAllInquiries, getSelectedInquiry, createInquiry, patchInquiry, deleteInquiry };
