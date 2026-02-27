import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [ContactModule, PortfolioModule],
})
export class AdminModule {}
