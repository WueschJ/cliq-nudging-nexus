
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Nominee {
  id: string;
  name: string;
}

interface NewNomineesProps {
  nominees: Nominee[];
  onAccept: (id: string) => void;
}

const NewNominees = ({ nominees, onAccept }: NewNomineesProps) => {
  return (
    <ul className="space-y-3">
      {nominees.length === 0 ? (
        <li className="text-gray-500 text-center py-4">No new nominees at the moment</li>
      ) : (
        nominees.map((nominee) => (
          <li 
            key={nominee.id}
            className="flex justify-between items-center p-3 rounded-md border bg-white transition-all duration-300"
          >
            <span className="font-medium">{nominee.name}</span>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onAccept(nominee.id)}
              className="border-green-400 text-green-600 hover:bg-green-50"
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </li>
        ))
      )}
    </ul>
  );
};

export default NewNominees;
