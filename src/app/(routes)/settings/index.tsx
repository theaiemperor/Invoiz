import Appearance from "@/src/components/routes/settings/ui/Appearance";
import { Box } from "@/src/components/ui/box";
import { Card } from "@/src/components/ui/card";

export default function () {
  return (
    <Box className="p-2 max-w-md w-full self-center">
      <Card>
        <Appearance />
      </Card>
    </Box>
  );
}
