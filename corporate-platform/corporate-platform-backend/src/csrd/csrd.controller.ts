import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CsrdService } from './csrd.service';
import { CreateMaterialityAssessmentDto } from './dto/assessment.dto';
import {
  DisclosureQueryDto,
  RecordDisclosureDto,
} from './dto/disclosure-query.dto';
import { CorporateAuthGuard } from '../shared/guards/corporate-auth.guard';
import { CompanyId } from '../shared/decorators/company-id.decorator';

@Controller('api/v1/csrd')
@UseGuards(CorporateAuthGuard)
export class CsrdController {
  constructor(private readonly csrdService: CsrdService) {}

  @Post('materiality/assess')
  async assessMateriality(
    @CompanyId() companyId: string,
    @Body() dto: CreateMaterialityAssessmentDto,
  ) {
    return this.csrdService.assessMateriality(companyId, dto);
  }

  @Get('materiality/current')
  async getCurrentMateriality(@CompanyId() companyId: string) {
    return this.csrdService.getCurrentMateriality(companyId);
  }

  @Post('disclosures/record')
  async recordDisclosure(
    @CompanyId() companyId: string,
    @Body() dto: RecordDisclosureDto,
  ) {
    return this.csrdService.recordDisclosure(companyId, dto);
  }

  @Get('disclosures')
  async listDisclosures(
    @CompanyId() companyId: string,
    @Query() query: DisclosureQueryDto,
  ) {
    return this.csrdService.listDisclosures(companyId, query);
  }

  @Get('disclosures/requirements')
  async getRequirements(@Query('standard') standard: string) {
    return this.csrdService.getRequirements(standard);
  }

  @Post('reports/generate')
  async generateReport(
    @CompanyId() companyId: string,
    @Body('year') year: number,
  ) {
    return this.csrdService.generateReport(companyId, year);
  }

  @Get('reports')
  async listReports(@CompanyId() companyId: string) {
    return this.csrdService.listReports(companyId);
  }

  @Get('readiness')
  async getReadiness(@CompanyId() companyId: string) {
    return this.csrdService.getReadinessScorecard(companyId);
  }
}
