import { NextRequest } from "next/server";
import { count, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { AdvocatesSuccessResponse, ApiErrorResponse, AdvocatesRequestParams } from "../../apiTypes";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: AdvocatesRequestParams = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      // Future: add search params and add to below sql query
    };
    
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20));
    const offset = (page - 1) * limit;

    const rawData = await db.select().from(advocates).limit(limit).offset(offset);
    const totalCount = await db.select({ count: count() }).from(advocates);
    const total = totalCount[0]?.count || 0;

    // Cast specialties from unknown to string[] and handle createdAt null
    // This is bad practice, but not improving for now for the sake of time
    const data = rawData.map(advocate => ({
      ...advocate,
      specialties: advocate.specialties as string[],
      createdAt: advocate.createdAt || undefined
    }));

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const response: AdvocatesSuccessResponse = {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching advocates:', error);
    
    const errorResponse: ApiErrorResponse = {
      error: 'Failed to fetch advocates'
    };
    
    return Response.json(errorResponse, { status: 500 });
  }
}
