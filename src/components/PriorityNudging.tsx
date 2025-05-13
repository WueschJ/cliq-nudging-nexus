
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  status: "pending" | "accepted" | "rejected" | "nudged";
}

interface PriorityNudgingProps {
  people: Person[];
  onAction: (id: string, action: "accept" | "reject" | "nudged") => void;
}

const PriorityNudging = ({ people, onAction }: PriorityNudgingProps) => {
  return (
    <ul className="space-y-3">
      {people.length === 0 ? (
        <li className="text-gray-500 text-center py-4">No priority people at the moment</li>
      ) : (
        people.map((person) => (
          <li 
            key={person.id}
            className={cn(
              "flex justify-between items-center p-3 rounded-md border transition-all duration-300",
              person.status === "accepted" ? "bg-blue-50 border-blue-200" : 
              person.status === "rejected" ? "line-through opacity-50" :
              person.status === "nudged" ? "opacity-50" : 
              "bg-white"
            )}
          >
            <span className="font-medium">{person.name}</span>
            <div className="flex space-x-2">
              {person.status === "accepted" ? (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onAction(person.id, "nudged")}
                  className="border-blue-400 text-blue-600 hover:bg-blue-50"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Nudged
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onAction(person.id, "accept")}
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onAction(person.id, "reject")}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default PriorityNudging;
