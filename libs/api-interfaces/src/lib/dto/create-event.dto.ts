import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateEventDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @Min(1)
  @Max(12)
  @IsNotEmpty()
  month: number;

  @Min(1)
  @Max(31)
  @IsNotEmpty()
  day: number;

  @IsNotEmpty()
  @IsString()
  condition: string;

  created_at: Date;
}
