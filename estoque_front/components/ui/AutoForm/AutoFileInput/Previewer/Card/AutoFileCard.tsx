import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ImagePreviewer from "@/components/ui/FilePreviewer/ImagePreviewer";
import sizeToText from "@/lib/FileHandler/sizeToText";
import { TrashIcon } from "lucide-react";

export interface AutoFileCardProps {
  file: Blob | File;
  name: string;
  size: number;
  onRemove: () => any;
}

export default function AutoFileCard({
  file,
  name,
  size,
  onRemove,
}: AutoFileCardProps) {
  return (
    <Card className="p-2 w-full max-w-[100%] border border-slate-400 dark:border-slate-600">
      <CardContent className="p-0 flex flex-row justify-between gap-1 space-y-0 items-start flex-nowrap">
        <div className="flex gap-2 items-end">
          <div className="w-[40px] h-[40px] relative">
            <ImagePreviewer
              file={file}
              className="max-w-full max-h-full object-cover"
              fill
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="w-full truncate">{name}</div>
            <div className="w-full truncate text-sm text-muted-foreground">
              {sizeToText(size)}
            </div>
          </div>
        </div>
        <Button
          type="button"
          onClick={onRemove}
          variant="ghost"
          color="destructive"
          className="text-lg"
        >
          <TrashIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
