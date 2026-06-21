import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentItem } from "@/data/educa";

export function FileUploadCard({ doc }: { doc: DocumentItem }) {
  const isUploaded = doc.status !== "Missing";
  const isVerified = doc.status === "Verified";

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 transition",
        isUploaded
          ? "bg-card border-border shadow-soft"
          : "bg-muted/40 border-dashed border-border hover:border-primary/40 hover:bg-muted/60",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={cn(
              "h-11 w-11 shrink-0 rounded-xl grid place-items-center",
              isVerified
                ? "bg-success/15 text-success-foreground"
                : isUploaded
                  ? "bg-primary/10 text-primary"
                  : "bg-white text-muted-foreground border border-border",
            )}
          >
            {isUploaded ? <FileText className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-display font-semibold text-navy">{doc.name}</h4>
              {doc.required && (
                <span className="text-[10px] uppercase tracking-wider font-bold rounded-full bg-destructive/10 text-destructive px-2 py-0.5">
                  Required
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
          </div>
        </div>
        <StatusPill status={doc.status} />
      </div>

      {isUploaded ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy truncate">{doc.fileName}</p>
            <p className="text-[11px] text-muted-foreground">Updated {doc.updated}</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white text-muted-foreground" aria-label="View">
              <Eye className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white text-muted-foreground" aria-label="Replace">
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <button className="w-full rounded-xl border-2 border-dashed border-border bg-white hover:border-primary/40 hover:bg-primary/5 px-4 py-5 text-center transition">
            <UploadCloud className="h-6 w-6 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-semibold text-navy">Click to upload</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">PDF, JPG or PNG · up to 5MB</p>
          </button>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: DocumentItem["status"] }) {
  const map = {
    Verified: { c: "bg-success/15 text-success-foreground", Icon: CheckCircle2 },
    Uploaded: { c: "bg-info/10 text-info", Icon: CheckCircle2 },
    Missing: { c: "bg-warning/20 text-warning-foreground", Icon: AlertCircle },
  } as const;
  const { c, Icon } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap", c)}>
      <Icon className="h-3 w-3" /> {status}
    </span>
  );
}