import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class PaginationQuery {
  @ApiProperty({ example: 10, required: false, type: Number })
  @IsOptional()
  limit: number

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  page: number

  @ApiProperty({
    example: 'bd8df4bb-3cd7-4946-905c-18c1794a8cdb',
    required: false,
  })
  @IsString()
  @IsOptional()
  cursor: string
}

export class PaginationReusltPageInfo {
  @ApiProperty()
  @IsBoolean()
  hasNextPage: boolean

  @ApiProperty()
  @IsString()
  cursor: string

  @ApiProperty()
  @IsNumber()
  total: string
}

export class PaginationResult {
  @ApiProperty({ type: PaginationReusltPageInfo })
  @IsObject()
  pageInfo: PaginationReusltPageInfo

  @ApiProperty()
  @IsArray()
  edges: any[]
}

export const applyPaginationQuery = async <T>(
  query: T | any,
  pagination: PaginationQuery,
  service: (props: any) => Promise<any[]>,
): Promise<any> => {
  const { limit, page, cursor } = pagination

  //sort by orderBy
  const sort = {
    orderBy: {
      createdAt: 'desc',
    },
  }

  let data = []
  const maxLimit = 500

  if (cursor) {
    //Pagination Cursor base
    data = await service({
      skip: 1,
      take: limit ? limit + 1 : maxLimit,
      cursor: cursor ? { id: cursor } : undefined,
      ...sort,
      ...query,
    })
  } else {
    //Pagiantion Page and Limit
    data = await service({
      skip: limit
        ? cursor
          ? limit * (page - 1) + 1
          : limit * (page ? page - 1 : 0)
        : undefined,
      take: limit ? limit + 1 : undefined,
      ...sort,
      ...query,
    })
  }

  const hasNextPage: boolean = limit
    ? data.length > limit
      ? true
      : false
    : false

  limit && data.length > limit && data.pop()

  return {
    pageInfo: {
      hasNextPage: hasNextPage,
      cursor: data[data.length - 1]?.id || '',
      total: data.length,
    },
    edges: data,
  }
}
