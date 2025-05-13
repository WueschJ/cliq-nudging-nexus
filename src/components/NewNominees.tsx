
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Nominee {
  id: string;
  name: string;
  nominatedBy?: string;
  nominationDate?: string; // ISO format date string
}

interface NewNomineesProps {
  nominees: Nominee[];
  onAccept: (id: string) => void;
}

const NewNominees = ({ nominees, onAccept }: NewNomineesProps) => {
  return (
    <ul className="space-y-3">
      {nominees.length === 0 ? (
        <li className="text-gray-500 text-center py-4 text-sm">No new nominees at the moment</li>
      ) : (
        nominees.map((nominee) => (
          <li 
            key={nominee.id}
            className="flex justify-between items-center p-3 rounded-md border bg-white transition-all duration-300"
          >
            <div>
              <span className="font-medium text-sm">{nominee.name}</span>
              {(nominee.nominatedBy || nominee.nominationDate) && (
                <div className="text-xs text-gray-400 mt-1">
                  {nominee.nominatedBy && <span>Nominated by {nominee.nominatedBy}</span>}
                  {nominee.nominatedBy && nominee.nominationDate && <span> • </span>}
                  {nominee.nominationDate && (
                    <span>
                      {new Date(nominee.nominationDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              )}
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onAccept(nominee.id)}
              className="border-green-400 text-green-600 hover:bg-green-50 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Accept
            </Button>
          </li>
        ))
      )}
    </ul>
  );
};

export default NewNominees;
