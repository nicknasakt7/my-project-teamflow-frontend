'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Pencil, Trash2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useComments } from '@/lib/api/comment/hooks/useComments';
import { useCreateComment } from '@/lib/api/comment/hooks/useCreateComment';
import { useUpdateComment } from '@/lib/api/comment/hooks/useUpdateComment';
import { useDeleteComment } from '@/lib/api/comment/hooks/useDeleteComment';
import type { TaskComment } from '@/lib/api/task/task.type';

function CommentItem({
  comment,
  currentUserId,
  isAdmin,
  onEdit,
  onDelete,
}: {
  comment: TaskComment;
  currentUserId: string;
  isAdmin: boolean;
  onEdit: (comment: TaskComment) => void;
  onDelete: (commentId: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const isDeleted = !!comment.deletedAt;
  const isOwner = comment.user.id === currentUserId;

  const initials = `${comment.user.firstName[0]}${comment.user.lastName[0]}`.toUpperCase();

  return (
    <div className="flex gap-2 px-2 py-1.5 rounded-lg bg-muted/30 border border-border">
      <Avatar className="size-6 shrink-0 mt-0.5">
        <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-xs font-semibold">
            {comment.user.firstName} {comment.user.lastName}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {new Date(comment.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </p>
          {!isDeleted && comment.updatedAt !== comment.createdAt && (
            <p className="text-[10px] text-muted-foreground italic">(edited)</p>
          )}
        </div>

        {isDeleted ? (
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground italic">This message was deleted.</p>
            {isAdmin && (
              <div>
                <button
                  onClick={() => setRevealed(v => !v)}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {revealed ? <ChevronUp className="size-2.5" /> : <ChevronDown className="size-2.5" />}
                  {revealed ? 'Hide' : 'View deleted'}
                </button>
                {revealed && (
                  <p className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-dashed border-border">
                    {comment.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{comment.content}</p>
        )}
      </div>

      {!isDeleted && isOwner && (
        <div className="flex items-start gap-0.5 shrink-0">
          <button
            onClick={() => onEdit(comment)}
            className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="size-3" />
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className="p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export function TaskComments({ taskId }: { taskId: string }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id ?? '';
  const isAdmin = session?.user?.roleType === 'ADMIN' || session?.user?.roleType === 'SUPER_ADMIN';

  const { data, isLoading } = useComments(taskId);
  const comments = data?.data ?? [];

  const { mutate: createComment, isPending: isCreating } = useCreateComment(taskId);
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment(taskId);
  const { mutate: deleteComment } = useDeleteComment(taskId);

  const [newText, setNewText] = useState('');
  const [editingComment, setEditingComment] = useState<TaskComment | null>(null);
  const [editText, setEditText] = useState('');

  const handleCreate = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    createComment(trimmed, { onSuccess: () => setNewText('') });
  };

  const handleStartEdit = (comment: TaskComment) => {
    setEditingComment(comment);
    setEditText(comment.content);
  };

  const handleUpdate = () => {
    if (!editingComment) return;
    const trimmed = editText.trim();
    if (!trimmed) return;
    updateComment(
      { commentId: editingComment.id, content: trimmed },
      { onSuccess: () => setEditingComment(null) }
    );
  };

  const activeCount = comments.filter(c => !c.deletedAt).length;

  return (
    <Card className="shadow-md">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Comments ({activeCount})
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No comments yet</p>
        ) : (
          <div className="space-y-2">
            {[...comments].reverse().map(c => (
              <CommentItem
                key={c.id}
                comment={c}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onEdit={handleStartEdit}
                onDelete={(id) => deleteComment(id)}
              />
            ))}
          </div>
        )}

        {editingComment ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Editing comment</p>
            <Textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              rows={2}
              className="resize-none text-sm"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingComment(null)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleUpdate} disabled={isUpdating || !editText.trim()}>
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-end pt-1 border-t border-border">
            <Textarea
              placeholder="Write a comment..."
              value={newText}
              onChange={e => setNewText(e.target.value)}
              rows={2}
              className="resize-none text-sm flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCreate();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleCreate}
              disabled={isCreating || !newText.trim()}
              className="shrink-0 h-10 w-10"
            >
              <Send className="size-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
