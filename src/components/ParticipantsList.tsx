
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Crown } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  avatar: string;
}

interface ParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-display flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Participants ({participants.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <span className="text-lg">{participant.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-white truncate">
                    {participant.name}
                  </span>
                  {participant.isHost && (
                    <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {participant.isHost ? 'Host' : 'Participant'}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantsList;
