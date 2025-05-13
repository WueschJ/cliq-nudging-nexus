
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface F2P {
  id: string;
  name: string;
  favor: string;
  status: "pending" | "accepted" | "rejected" | "done";
}

interface PotentialF2PsProps {
  f2ps: F2P[];
  onAction: (id: string, action: "accept" | "reject" | "done") => void;
}

const PotentialF2Ps = ({ f2ps, onAction }: PotentialF2PsProps) => {
  return (
    <ul className="space-y-3">
      {f2ps.length === 0 ? (
        <li className="text-gray-500 text-center py-4">No potential F2Ps at the moment</li>
      ) : (
        f2ps.map((f2p) => (
          <li 
            key={f2p.id}
            className={cn(
              "p-3 rounded-md border transition-all duration-300",
              f2p.status === "accepted" ? "bg-blue-50 border-blue-200" : 
              f2p.status === "rejected" ? "line-through opacity-50" :
              f2p.status === "done" ? "opacity-50" : 
              "bg-white"
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{f2p.name}</span>
              <div className="flex space-x-2">
                {f2p.status === "accepted" ? (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => onAction(f2p.id, "done")}
                    className="border-green-400 text-green-600 hover:bg-green-50"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Done
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onAction(f2p.id, "accept")}
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onAction(f2p.id, "reject")}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">"{f2p.favor}"</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default PotentialF2Ps;
